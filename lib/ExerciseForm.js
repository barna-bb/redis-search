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
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">Name</label>
        <input name="name" type="text" className="form-control" />
        <label htmlFor="category" className="form-label">Category</label>
        <input name="category" type="text" className="form-control" />
        <label htmlFor="bodyPart" className="form-label">Body Part</label>
        <input name="bodyPart" type="text" className="form-control" />
  
        <button type="submit">Create Exercise</button>
      </form>
    );
  }