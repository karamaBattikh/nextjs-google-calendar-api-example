import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import style from "./form.module.scss";
import Color from "components/color";
import { CALENDAR_COLOR } from "utils/constants";

const FormEvent = ({ day }) => {
  const { register, handleSubmit, watch, control, errors, setValue } = useForm({
    defaultValues: {
      attendees: [{ email: "" }],
    },
  });
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "attendees",
  });

  const onSubmit = async (values) => {
    console.log(values);

    const res = await fetch("/api/calendar/addEvent", {
      method: "POST",
      body: JSON.stringify({ ...values, dayEvent: format(day, "M d yyyy") }),
    });

    const { data, message, status } = await res.json();
    console.log(
      "🚀 ~ file: index.js ~ line 81 ~ addEventToClaendar ~ res",
      status,
      message,
      data
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Le {format(day, "dd MMMM yyyy", { locale: fr })}</h3>

      <div className={style.field}>
        <label htmlFor="startTime" className={style.fieldLabel}>
          sartTime
        </label>
        <input
          id="startTime"
          name="startTime"
          type="time"
          ref={register}
          className={style.fieldInput}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="endTime" className={style.fieldLabel}>
          endTime
        </label>
        <input
          id="endTime"
          name="endTime"
          type="time"
          ref={register}
          className={style.fieldInput}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="summary" className={style.fieldLabel}>
          summary
        </label>
        <input
          id="summary"
          name="summary"
          type="text"
          ref={register}
          className={style.fieldInput}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="description" className={style.fieldLabel}>
          description
        </label>
        <textarea
          id="description"
          name="description"
          type="text"
          ref={register}
          className={style.fieldInput}
        />
      </div>

      <div>
        <input
          id="conference"
          name="conference"
          type="checkbox"
          ref={register}
        />
        <label htmlFor="conference">Add conference</label>
      </div>

      <div>
        {CALENDAR_COLOR?.map((color, index) => (
          <Color
            key={`color-${index}`}
            name="color"
            inputRef={register}
            color={color}
            handleClick={() => {
              setValue("color", index);
            }}
          >
            {watch("color") == index && <img src="/check.svg" width="15" />}
          </Color>
        ))}
      </div>

      <div className={style.field}>
        <label htmlFor="eamil" className={style.fieldLabel}>
          email
        </label>
        <div className={style.fieldInput}>
          <div>
            {fields?.map((field, index) => {
              return (
                <div key={field.id}>
                  <input
                    type="email"
                    name={`attendees[${index}].email`}
                    defaultValue={`${field.email}`}
                    ref={register()}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => {
              insert(fields.length, {
                email: "",
              });
            }}
          >
            +
          </button>
        </div>
      </div>

      <button type="submit">Create Events</button>
    </form>
  );
};

export default FormEvent;
