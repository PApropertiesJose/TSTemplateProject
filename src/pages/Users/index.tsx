import { Button, Group, Table, Avatar, Badge, Card, Container, Title, Text, Divider, ScrollArea } from '@mantine/core';
import { createRoute } from '@tanstack/react-router';
import { authenticatedRoute } from '../../router';
import { StringRoutes } from '../../const/StringRoutes';
import { PageHeader } from '../../components/PageHeader';
import { IconPlus } from '@tabler/icons-react';
import UserTable from './components/UserTable';


interface UserProps { }

export const userRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.users,
  component: Users
});

function Users(): UserProps {
  return (
    <Container p={0} fluid>
      <PageHeader
        breadcrumbs={['Users']}
        title="Users"
        description='Grant permission access to the users.'
        actions={
          <Button
            leftSection={<IconPlus size={16} stroke={2} />}
            variant='light' color="green">
            Add User
          </Button>
        }
      />

      <Card padding="lg"  >
        <Title order={4}>Accounts</Title>
        <Text c="dimmed" size="md" mt={4}>
          Granted permission access list
        </Text>
        <Divider my={5} />

        <UserTable />
        
      </Card>
    </Container>
  );
}

export default Users;
