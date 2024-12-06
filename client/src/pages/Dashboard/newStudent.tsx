import NewStudentEntry from "@/components/student/studentEntryForm";

const NewStudentPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl font-bold text-foreground mb-4">Student</h1>
        <NewStudentEntry />
      </div>
    </div>
  );
};
export default NewStudentPage;
