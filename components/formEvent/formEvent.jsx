import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import style from "./form.module.scss";

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
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="1"
          style={{ backgroundColor: "#7986cb" }}
          onClick={(e) => {
            setValue("color", e?.target?.dataset?.set);
          }}
        >
          {watch("color") === "1" && <img src="/check.svg" width="15" />}
        </button>
        <button
          name="color"
          ref={register}
          type="button"
          className={style.color}
          data-set="2"
          style={{ backgroundColor: "#33b679" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "2" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="3"
          style={{ backgroundColor: "#8e24aa" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "3" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="4"
          style={{ backgroundColor: "#e67c73" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "4" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="5"
          style={{ backgroundColor: "#f6c026" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "5" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="6"
          style={{ backgroundColor: "	#f5511d" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "6" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="7"
          style={{ backgroundColor: "#039be5" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "7" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="8"
          style={{ backgroundColor: "#616161" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "8" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="9"
          style={{ backgroundColor: "#3f51b5" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "9" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="10"
          style={{ backgroundColor: "	#0b8043" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "10" && <img src="/check.svg" width="15" />}
        </button>
        <button
          type="button"
          name="color"
          ref={register}
          className={style.color}
          data-set="11"
          style={{ backgroundColor: "#d60000" }}
          onClick={(e) => setValue("color", e?.target?.dataset?.set)}
        >
          {watch("color") === "11" && <img src="/check.svg" width="15" />}
        </button>
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
