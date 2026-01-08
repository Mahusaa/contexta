import { HomePage } from "@/components/home-page";
import { getAllAgents, getAllSkills, getAllWorkflows } from "@/lib/content";

export default function Home() {
  const agents = getAllAgents();
  const skills = getAllSkills();
  const workflows = getAllWorkflows();

  return (
    <HomePage
      agents={agents}
      skills={skills}
      workflows={workflows}
    />
  );
}
