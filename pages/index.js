import SearchForm from "@/lib/SearchForm";
import ExerciseForm from "@/lib/ExerciseForm";

export default function Home() {
  return (
    <main>
      <h1>Create Exercise</h1>
      <ExerciseForm />
      <hr />
      <h1>Find Exercise</h1>
      <SearchForm />
    </main>
  )
}