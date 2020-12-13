import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import style from "./form.module.scss";

const FormEvent = ({ day }) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const res = await fetch("/api/calendar/addEvent", {
      method: "POST",
      body: JSON.stringify({ ...data, dayEvent: format(day, "M d yyyy") }),
    });
    console.log(
      "🚀 ~ file: index.js ~ line 81 ~ addEventToClaendar ~ res",
      res
    );
  };

  return (
    <div>
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
          <label htmlFor="title" className={style.fieldLabel}>
            titre du Event
          </label>
          <input
            id="title"
            name="title"
            type="text"
            ref={register}
            className={style.fieldInput}
          />
        </div>

        <div className={style.field}>
          <label htmlFor="description" className={style.fieldLabel}>
            description du Event
          </label>
          <textarea
            id="description"
            name="description"
            type="text"
            ref={register}
            className={style.fieldInput}
          />
        </div>

        <div className={style.field}>
          <label htmlFor="conference" className={style.fieldLabel}>
            Ajouter un lien du conference
          </label>
          <input
            id="conference"
            name="conference"
            type="checkbox"
            ref={register}
            className={style.fieldInput}
          />
        </div>

        {/* <div className={style.field}>
          <label htmlFor="eamil" className={style.fieldLabel}>
            email
          </label>
          <div className={style.fieldInput}>
            <div>
              <input name="email" type="email" />
              <input name="name" type="email" />
            </div>
            <button type="button">+</button>
          </div>
        </div> */}

        <button type="submit">Create Events</button>
      </form>
    </div>
  );
};

export default FormEvent;
