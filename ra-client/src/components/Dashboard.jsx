import { useMemo } from 'react';
import {
  Container,
  Grid,
  Card,
  Typography,
  Box,
  LinearProgress,
  Paper,
  Avatar,
  CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  PeopleAlt as PeopleAltIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  DonutSmall as DonutSmallIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from 'recharts';
import { useGetList } from 'react-admin';

const SummaryCard = ({ title, value, icon, color }) => (
  <Card sx={{ display: 'flex', alignItems: 'center', p: 2, height: '100%' }}>
    <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2 }}>
      {icon}
    </Avatar>
    <Box>
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography color="text.secondary">{title}</Typography>
    </Box>
  </Card>
);

const Dashboard = () => {
  const muiTheme = useTheme();

  const { data: usersData, isLoading: isLoadingUsers, error: errorUsers } = useGetList('users');
  const { data: clientsData, isLoading: isLoadingClients, error: errorClients } = useGetList('clients');
  const { data: projectsData, isLoading: isLoadingProjects, error: errorProjects } = useGetList('projects');
  const { data: contentPiecesData, isLoading: isLoadingContentPieces, error: errorContentPieces } = useGetList('contentPieces');

  const PIE_CHART_COLORS = useMemo(() => [
    muiTheme.palette.primary.main,
    muiTheme.palette.secondary.main,
    muiTheme.palette.success.main,
    muiTheme.palette.warning.main,
    muiTheme.palette.info.main,
    '#FFBB28',
    '#FF8042',
    '#00C49F'
  ], [muiTheme]);

  const processedData = useMemo(() => {
    const currentClients = clientsData || [];
    const currentProjects = projectsData || [];
    const currentContentPieces = contentPiecesData || [];

    const activeClients = currentClients.filter(client => client.isActive).length;
    const activeProjects = currentProjects.filter(project => project.status === "In Progress" || project.status === "Pending").length;
    const pendingContentPieces = currentContentPieces.filter(cp => ["Draft", "In Review", "Submitted for Review", "Requires Revision"].includes(cp.status)).length;

    const completedProjectsCount = currentProjects.filter(p => p.status === "Completed" || p.status === "Published").length;
    const totalProjects = currentProjects.length;
    const projectCompletionRate = totalProjects > 0 ? (completedProjectsCount / totalProjects) * 100 : 0;

    const projectStatusCounts = currentProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});
    const projectStatusData = Object.entries(projectStatusCounts).map(([name, value]) => ({ name, value }));

    const contentTypeCounts = currentContentPieces.reduce((acc, piece) => {
      acc[piece.type] = (acc[piece.type] || 0) + 1;
      return acc;
    }, {});
    const contentTypeData = Object.entries(contentTypeCounts).map(([name, value]) => ({ name, value }));

    return {
      activeClients, activeProjects, pendingContentPieces, projectCompletionRate, projectStatusData, contentTypeData, totalProjects, completedProjectsCount
    };
  }, [clientsData, projectsData, contentPiecesData]);

  if (isLoadingUsers || isLoadingClients || isLoadingProjects || isLoadingContentPieces) {
    return (
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
      </Container>
    );
  }

  if (errorUsers || errorClients || errorProjects || errorContentPieces) {
    if(errorUsers) console.error("Error fetching users:", errorUsers);
    if(errorClients) console.error("Error fetching clients:", errorClients);
    if(errorProjects) console.error("Error fetching projects:", errorProjects);
    if(errorContentPieces) console.error("Error fetching content pieces:", errorContentPieces);
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, backgroundColor: muiTheme.palette.error.light, color: muiTheme.palette.error.contrastText }}>
                <Typography variant="h5">Error Loading Dashboard</Typography>
                <Typography>There was an issue fetching the necessary data. Please try refreshing the page or contact support if the issue persists.</Typography>
            </Paper>
        </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Agency Dashboard Overview
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Active Clients" value={processedData.activeClients} icon={<PeopleAltIcon />} color={muiTheme.palette.primary.light} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Active Projects" value={processedData.activeProjects} icon={<AssignmentIcon />} color={muiTheme.palette.secondary.light} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Total Users" value={usersData?.length || 0} icon={<PeopleAltIcon />} color={muiTheme.palette.warning.light} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard title="Pending Content" value={processedData.pendingContentPieces} icon={<DescriptionIcon />} color={muiTheme.palette.info.light} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Overall Project Completion</Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: muiTheme.palette.success.main }}>
              {processedData.projectCompletionRate.toFixed(1)}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {processedData.completedProjectsCount} of {processedData.totalProjects} projects completed
            </Typography>
            <LinearProgress variant="determinate" value={processedData.projectCompletionRate} sx={{ height: 10, borderRadius: 5 }} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              <DonutSmallIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Project Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={processedData.projectStatusData}
                  cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {processedData.projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={7}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              <CategoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Content Type Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <RechartsBarChart data={processedData.contentTypeData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill={muiTheme.palette.secondary.main} name="Content Pieces" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard;