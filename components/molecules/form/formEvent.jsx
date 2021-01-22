import { useState, useEffect, useContext } from "react";
import { ModalContext } from "contexts/modal";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Color from "components/atoms/color";
import { CALENDAR_COLOR } from "utils/constants";
import Button from "components/atoms/button";
import Input from "components/atoms/input";
import { useCreateEvent } from "services/event";
import { LOADING, SUCCESS, ERROR, REGEX_EMAIL } from "utils/constants";

import styles from "./form.module.scss";

const FormEvent = ({ day }) => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue,
    clearErrors,
    setError,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const [attendees, setAttendees] = useState([]);

  const { toggle } = useContext(ModalContext);

  const { mutate: mutateCreate, status } = useCreateEvent();

  const onSubmit = async (values) => {
    const data = {
      ...values,
      dayEvent: day,
      attendees: attendees,
    };
    await mutateCreate(data);
  };

  const handleAttendees = (e) => {
    if (e.charCode === 13) {
      if (!e.target.value.match(REGEX_EMAIL)) {
        setError("attendees", {
          type: "manual",
          message: "Veuillez saisir une adresse e-mail correcte",
        });
      } else {
        clearErrors("attendees");
        if (attendees.find((attendee) => attendee.email === e.target.value)) {
          setError("attendees", {
            type: "manual",
            message: "cette adress déja existe",
          });
        } else {
          setAttendees([...attendees, { email: e.target.value }]);
          e.target.value = "";
        }
      }
    }
  };

  useEffect(() => {
    if (status === SUCCESS) {
      toggle(false);
    }
    return () => {};
  }, [status, toggle]);

  return (
    <form className={styles.form}>
      <h3>Le {format(day, "dd MMMM yyyy", { locale: fr })}</h3>

      <Input
        label="summary"
        id="summary"
        name="summary"
        type="text"
        placeholder="summary"
        refInput={register({ required: "summary est obligatoire" })}
        error={!!errors?.summary}
        errorMessage={errors.summary?.message}
      />

      <Input
        label="description"
        id="description"
        name="description"
        placeholder="description"
        type="text"
        refInput={register({ required: "description est obligatoire" })}
        error={!!errors?.description}
        errorMessage={errors?.description?.message}
      />

      <Input
        label="startTime"
        id="startTime"
        name="startTime"
        type="time"
        refInput={register({ required: "startTime est obligatoire" })}
        error={!!errors?.startTime}
        errorMessage={errors?.startTime?.message}
      />

      <Input
        label="endTime"
        id="endTime"
        name="endTime"
        type="time"
        refInput={register({ required: "endTime est obligatoire" })}
        error={!!errors?.endTime}
        errorMessage={errors?.endTime?.message}
      />

      <div>
        <input
          id="conference"
          name="conference"
          type="checkbox"
          ref={register}
        />
        <label htmlFor="conference">Add conference</label>
      </div>

      <Input
        label="emails"
        type="text"
        name="email"
        onBlur={() => {
          clearErrors("attendees");
        }}
        placeholder="Ajouter des invités"
        onKeyPress={(e) => handleAttendees(e)}
        handleChange={() => {
          clearErrors("attendees");
        }}
        error={!!errors?.attendees}
        errorMessage={errors?.attendees?.message}
      />

      {attendees?.map((attendee, index) => {
        return (
          <div className={styles.attendee} key={index}>
            <span>{attendee.email}</span>
            <Button
              icon="onlyIcon"
              handleClick={() => {
                setAttendees(attendees.filter((_, i) => i !== index));
              }}
            >
              <img src="/close.svg" width="15" />
            </Button>
          </div>
        );
      })}

      <div>
        {CALENDAR_COLOR?.map((color, index) => (
          <Color
            key={`color-${index}`}
            name="color"
            inputRef={register}
            color={color}
            handleClick={() => setValue("color", index)}
          >
            {watch("color") == index && <img src="/check.svg" width="15" />}
          </Color>
        ))}
      </div>

      <Button
        center
        bgColor="cornflowerblue"
        handleClick={(e) => {
          e.preventDefault();
          if (attendees.length <= 0) {
            setError("attendees", {
              type: "manual",
              message: "one email is required",
            });
          }
          handleSubmit(onSubmit)();
        }}
      >
        {status === LOADING ? "loading..." : "Create Event"}
      </Button>
      {status === ERROR && <p style={{ color: "red" }}>{errors}</p>}
    </form>
  );
};

export default FormEvent;
