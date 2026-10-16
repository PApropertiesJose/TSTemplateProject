import { Container } from "@mantine/core";
import { createRoute, useParams } from '@tanstack/react-router';
import { authenticatedRoute } from "../../router";
import { StringRoutes } from "../../const/StringRoutes";

export const projectSelectionRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: `${StringRoutes.project_selection}/$route`,
  component: ProjectSelection
});

function ProjectSelection () {
  const { route } = projectSelectionRoute.useParams();
  return (
    <Container fluid p={0}>

    </Container>
  )
}


export default ProjectSelection;
