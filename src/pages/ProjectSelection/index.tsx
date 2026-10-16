import { Container, SimpleGrid } from "@mantine/core";
import { PageHeader } from "../../components/PageHeader";
import ProjectCard, { type ProjectData } from "../../components/ProjectCard";

function ProjectSelection() {
  return (
    <Container fluid p={0}>
      <PageHeader
        breadcrumbs={["Projects"]}
        title="Projects"
        description="Select a projects PA/JV from the list."
      />
      <SimpleGrid cols={4}>
        <ProjectCard data={{
          code: "SJRF-2",
          description: 'St. Richfield 2PCS',
          location: "Sta. Rosa"
        } as ProjectData} />
      </SimpleGrid>
    </Container>
  );
}

export default ProjectSelection;
