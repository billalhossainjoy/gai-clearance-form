
import ActionDialog from "@/components/allStudent/updateAndDelete";
import { DataTable } from "@/components/common/table";
import { Student } from "@/components/studentColumns/allStudent";
import { applicantsColumns } from "@/components/studentColumns/applicant";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchAllApplicentStudent } from "@/store/student/student.slice";
import { useEffect } from "react";

const ApplicantsPage: React.FC = () => {
  const { data,isLoading } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllApplicentStudent());
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto px-4 py-5">
        <h1 className="text-3xl font-bold text-foreground mb-4">Students</h1>
        <div className="bg-secondary p-6 rounded space-y-3 border">
          <h1 className="text-xl font-semibold text-foreground">
            All applicants.
          </h1>
          <DataTable<Student, any>
            columns={applicantsColumns}
            data={data}
            loading={isLoading}
          />
          <ActionDialog />
        </div>
      </div>
    </div>
  );
};
export default ApplicantsPage;
