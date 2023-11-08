export default function ExerciseForm() {
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const form = new FormData(e.target);
      const formData = Object.fromEntries(form.entries());
  
      const res = await fetch('/api/exercise', {
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
  
      const result = await res.json();
      console.log(result)
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="name" type="text"  />
        <input name="category" type="text"  />
        <input name="bodyPart" type="text"  />
  
        <button type="submit">Create Exercise</button>
      </form>
    );
  }