import { useForm } from "react-hook-form";

const CATS = ["general", "work", "personal", "shopping"];

export default function AddTodoForm({ onAdd }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: "", description: "", category: "general", dueDate: "" }
  });

  const submit = async (values) => {
    await onAdd(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="todo-form">
      <input placeholder="Task name *" {...register("title", { required: true, minLength: 2 })} />
      {errors.title && <small className="error">Title required</small>}

      <textarea placeholder="Description" {...register("description")} />

      <select {...register("category")}>
        {CATS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <input type="date" {...register("dueDate")} />

      <button type="submit">Add</button>
    </form>
  );
}
