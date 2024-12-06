import AddRow from "@/components/signetures/addRow";
import SignetureDialog from "@/components/signetures/signetureDialog";
import ViewClearanceForm from "@/components/signetures/viewForm";

const SigneturesPage: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto px-4 py-5 space-y-3">
        <h1 className="text-3xl font-bold text-foreground">Signetures</h1>
        <AddRow />

        <ViewClearanceForm />

        <SignetureDialog />
      </div>
    </div>
  );
};
export default SigneturesPage;
