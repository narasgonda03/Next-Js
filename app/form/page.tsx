export default function FormPage() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name");
    console.log("Name from form:", name);
  }

  return (
    <form action={handleSubmit} style={{ padding: 20 }}>
      <h2>Simple Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter your name"
      />

      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
}
