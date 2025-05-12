import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import ApplicationForm from "../application/applicationForm";
import ClearanceForm from "./ClearanceForm";

const Client: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState("clearanceForm");

  useEffect(() => {
    if (searchParams.get("varification")) setState("verificationForm");

    if (state === "verificationForm") navigate("/?varification=");
    else setSearchParams({});
  }, [navigate, state, setSearchParams, searchParams]);
  return (
    <Tabs defaultValue={state} onValueChange={setState} className="w-full my-5">
      <TabsList className="w-full h-full">
        <TabsTrigger
          value="clearanceForm"
          className="w-full text-sm md:text-lg"
        >
          Clearance Form
        </TabsTrigger>
        <TabsTrigger value="application" className="w-full text-sm md:text-lg">
          Application
        </TabsTrigger>
      </TabsList>
      <TabsContent value="clearanceForm">
        <ClearanceForm />
      </TabsContent>
      <TabsContent value="application">
        <ApplicationForm />
      </TabsContent>
    </Tabs>
  );
};

export default Client;
