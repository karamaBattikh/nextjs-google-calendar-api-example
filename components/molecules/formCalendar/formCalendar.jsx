import { useState, useEffect, useContext } from "react";
import { ModalContext } from "contexts/modal";
import { useForm } from "react-hook-form";
import styles from "./form.module.scss";
import Button from "components/atoms/button";
import Input from "components/atoms/input";
import { useCreateCalendar } from "services/calendar";
import { LOADING, SUCCESS, ERROR } from "utils/constants";

const REGEX_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g;

const FormCalendar = () => {
  const { register, handleSubmit, setError, clearErrors, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });

  const { toggle } = useContext(ModalContext);

  const [attendees, setAttendees] = useState([]);

  const { mutate: mutateCreate, status } = useCreateCalendar();

  const onSubmit = async (values) => {
    const data = {
      ...values,
      emailList: attendees,
    };

    await mutateCreate(data);
  };

  useEffect(() => {
    if (status === SUCCESS) {
      toggle(false);
    }
    return () => {};
  }, [status, toggle]);

  const handleAttendees = (event) => {
    if (event.charCode === 13) {
      if (!event.target.value.match(REGEX_EMAIL)) {
        setError("attendees", {
          type: "manual",
          message: "Veuillez saisir une adresse e-mail correcte",
        });
      } else {
        clearErrors("attendees");
        if (attendees.find((attendee) => attendee === event.target.value)) {
          setError("attendees", {
            type: "manual",
            message: "cette adress déja existe",
          });
        } else {
          setAttendees([...attendees, event.target.value]);
          event.target.value = "";
        }
      }
    }
  };

  return (
    <form className={styles.form}>
      <Input
        label="summary"
        id="summary"
        name="summary"
        type="text"
        placeholder="summary"
        refInput={register({ required: "summary est obligatoire" })}
        error={!!errors.summary}
        errorMessage={errors.summary?.message}
      />

      <Input
        label="description"
        id="description"
        name="description"
        type="text"
        refInput={register({ required: "description est obligatoire" })}
        error={!!errors?.description}
        errorMessage={errors?.description?.message}
      />

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
            <span>{attendee}</span>
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
        {status === LOADING ? "loading..." : "Create Calendar"}
      </Button>
      {status === ERROR && (
        <p style={{ color: "red" }}>probléme dans la creation de calendrier</p>
      )}
    </form>
  );
};

export default FormCalendar;
