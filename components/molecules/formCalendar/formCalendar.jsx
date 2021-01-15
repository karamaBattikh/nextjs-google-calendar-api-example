import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import style from "./form.module.scss";

const FormCalendar = () => {
  const { register, handleSubmit, control, watch, errors, setValue } = useForm({
    defaultValues: {
      emailList: [{ email: "" }],
    },
  });
  const { fields, remove, insert } = useFieldArray({
    control,
    name: "emailList",
  });

  const onSubmit = async (values) => {
    const res = await fetch("/api/calendar/addCalendar", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        emailList: values?.emailList?.reduce((acc, item) => {
          if (item.email) acc.push(item.email);
          return acc;
        }, []),
      }),
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
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
                    name={`emailList[${index}].email`}
                    defaultValue={`${field.email}`}
                    ref={register()}
                  />
                  <button type="button" onClick={() => remove(index)}>
                    Delete
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

      <button type="submit">Create Calendar</button>
    </form>
  );
};

export default FormCalendar;
