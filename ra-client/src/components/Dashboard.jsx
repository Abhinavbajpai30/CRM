import { useMemo } from 'react';

import {
  Container,
  Grid,
  Card,
  Typography,
  Box,
  LinearProgress,
  Paper,
  CssBaseline,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ThemeProvider
} from '@mui/material';
import { useTheme } from '@mui/material/styles'; // For accessing theme in AgencyDashboard
import {
  PeopleAlt as PeopleAltIcon,
  Assignment as AssignmentIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  Description as DescriptionIcon,
  DonutSmall as DonutSmallIcon,
  BarChart as BarChartIcon,
  TrendingUp as TrendingUpIcon,
  TaskAlt as TaskAltIcon,
  Category as CategoryIcon,
  Dashboard as DashboardIcon
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

  const jsonData = {
    "users": [
      { "id": 1, "username": "admin_user", "fullName": "Admin User", "email": "admin@agency.com", "role": "Admin", "avatar": "https://i.pravatar.cc/150?u=admin_user" },
      { "id": 2, "username": "sarah_strategist", "fullName": "Sarah Connor", "email": "sarah.connor@agency.com", "role": "Content Strategist", "avatar": "https://i.pravatar.cc/150?u=sarah_strategist" },
      { "id": 3, "username": "john_strategist", "fullName": "John Doe", "email": "john.doe@agency.com", "role": "Content Strategist", "avatar": "https://i.pravatar.cc/150?u=john_strategist" },
      { "id": 4, "username": "mike_editor", "fullName": "Mike Ross", "email": "mike.ross@agency.com", "role": "Editor", "avatar": "https://i.pravatar.cc/150?u=mike_editor" },
      { "id": 5, "username": "lisa_editor", "fullName": "Lisa Ray", "email": "lisa.ray@agency.com", "role": "Editor", "avatar": "https://i.pravatar.cc/150?u=lisa_ray" },
      { "id": 6, "username": "peter_writer", "fullName": "Peter Quill", "email": "peter.quill@agency.com", "role": "Writer", "avatar": "https://i.pravatar.cc/150?u=peter_writer" },
      { "id": 7, "username": "anna_writer", "fullName": "Anna Scott", "email": "anna.scott@agency.com", "role": "Writer", "avatar": "https://i.pravatar.cc/150?u=anna_writer" },
      { "id": 8, "username": "david_writer", "fullName": "David Kim", "email": "david.kim@agency.com", "role": "Writer", "avatar": "https://i.pravatar.cc/150?u=david_kim" }
    ],
    "clients": [
      { "id": 1, "name": "Tech Solutions Inc.", "industry": "Technology", "contactPerson": "Alice Wonderland", "contactEmail": "alice@techsolutions.com", "contactPhone": "555-0101", "goals": ["Increase brand awareness", "Generate B2B leads"], "strategistId": 2, "createdDate": "2024-01-15T10:00:00.000Z", "isActive": true },
      { "id": 2, "name": "GreenLeaf Organics", "industry": "E-commerce / Retail", "contactPerson": "Bob The Builder", "contactEmail": "bob@greenleaf.com", "contactPhone": "555-0102", "goals": ["Drive online sales", "Educate consumers on organic products"], "strategistId": 3, "createdDate": "2024-03-01T14:30:00.000Z", "isActive": true },
      { "id": 3, "name": "Future Finance Co.", "industry": "Finance", "contactPerson": "Carol Danvers", "contactEmail": "carol@futurefinance.com", "contactPhone": "555-0103", "goals": ["Establish thought leadership", "Attract new investors"], "strategistId": 2, "createdDate": "2023-11-10T09:00:00.000Z", "isActive": false },
      { "id": 4, "name": "Healthy Living Foods", "industry": "Food & Beverage", "contactPerson": "Diana Prince", "contactEmail": "diana@healthyliving.com", "contactPhone": "555-0104", "goals": ["Promote new product line", "Increase social media engagement", "Build community around healthy eating"], "strategistId": 3, "createdDate": "2024-05-20T11:00:00.000Z", "isActive": true },
      { "id": 5, "name": "EduGrowth Platforms", "industry": "Education Technology", "contactPerson": "Edward Nygma", "contactEmail": "edward@edugrowth.com", "contactPhone": "555-0105", "goals": ["Generate leads for SaaS platform", "Position as an innovator in EdTech", "Increase webinar attendance"], "strategistId": 2, "createdDate": "2024-08-01T09:30:00.000Z", "isActive": true },
      { "id": 6, "name": "Artisan Crafts Co.", "industry": "Retail / Handmade Goods", "contactPerson": "Selina Kyle", "contactEmail": "selina@artisancrafts.com", "contactPhone": "555-0106", "goals": ["Drive traffic to online store", "Highlight artisan stories", "Grow email subscriber list"], "strategistId": 3, "createdDate": "2023-09-15T16:15:00.000Z", "isActive": false },
      { "id": 7, "name": "Sustainable Futures Initiative", "industry": "Non-Profit / Environmental", "contactPerson": "Arthur Curry", "contactEmail": "arthur@sfi.org", "contactPhone": "555-0107", "goals": ["Raise awareness for environmental causes", "Increase donations", "Recruit volunteers"], "strategistId": 2, "createdDate": "2025-01-10T10:20:00.000Z", "isActive": true },
      { "id": 8, "name": "Innovate AI Labs", "industry": "Artificial Intelligence Research", "contactPerson": "Victor Stone", "contactEmail": "victor@innovateai.com", "contactPhone": "555-0108", "goals": ["Publish research findings", "Attract top AI talent", "Secure research grants"], "strategistId": 3, "createdDate": "2024-11-05T14:00:00.000Z", "isActive": true }
    ],
    "projects": [
      { "id": 1, "clientId": 1, "name": "Q3 Tech Blog Campaign", "description": "Series of blog posts on emerging AI trends.", "status": "In Progress", "strategistId": 2, "startDate": "2025-04-01T09:00:00.000Z", "dueDate": "2025-06-30T17:00:00.000Z", "completionDate": null, "teamIds": [6, 4] },
      { "id": 2, "clientId": 1, "name": "Cybersecurity Whitepaper", "description": "In-depth whitepaper on data protection strategies.", "status": "Pending", "strategistId": 2, "startDate": "2025-07-01T09:00:00.000Z", "dueDate": "2025-08-31T17:00:00.000Z", "completionDate": null, "teamIds": [7] },
      { "id": 3, "clientId": 2, "name": "Organic Living Social Media", "description": "Monthly social media content creation and management.", "status": "Completed", "strategistId": 3, "startDate": "2025-02-01T09:00:00.000Z", "dueDate": "2025-04-30T17:00:00.000Z", "completionDate": "2025-04-28T15:00:00.000Z", "teamIds": [8, 5] },
      { "id": 4, "clientId": 2, "name": "Healthy Recipes Blog Series", "description": "Weekly blog posts with organic recipes.", "status": "Published", "strategistId": 3, "startDate": "2025-01-10T09:00:00.000Z", "dueDate": "2025-03-31T17:00:00.000Z", "completionDate": "2025-03-25T10:00:00.000Z", "teamIds": [6, 4] },
      { "id": 5, "clientId": 3, "name": "Investment Insights Newsletter", "description": "Bi-weekly newsletter for investors.", "status": "In Progress", "strategistId": 2, "startDate": "2025-05-15T09:00:00.000Z", "dueDate": "2025-12-31T17:00:00.000Z", "completionDate": null, "teamIds": [7, 5] }
    ],
    "contentPieces": [
      { "id": 1, "projectId": 1, "title": "The Future of AI in Business Automation", "type": "Blog Post", "status": "In Review", "writerId": 6, "editorId": 4, "submissionDate": "2025-05-20T10:00:00.000Z", "dueDate": "2025-05-25T17:00:00.000Z" },
      { "id": 2, "projectId": 1, "title": "Top 5 Machine Learning Applications for SMEs", "type": "Article", "status": "Draft", "writerId": 6, "editorId": null, "dueDate": "2025-06-10T17:00:00.000Z" },
      { "id": 3, "projectId": 3, "title": "Why Organic Cotton is Better for You", "type": "Social Media Post", "status": "Approved", "writerId": 8, "editorId": 5, "approvalDate": "2025-03-07T11:00:00.000Z", "dueDate": "2025-03-04T17:00:00.000Z" },
      { "id": 4, "projectId": 4, "title": "Easy Weeknight Dinner: Quinoa Salad", "type": "Blog Post", "status": "Published", "writerId": 6, "editorId": 4, "publishDate": "2025-02-15T09:00:00.000Z", "dueDate": "2025-02-09T17:00:00.000Z" },
      { "id": 5, "projectId": 5, "title": "Market Watch: May 2025 Highlights", "type": "Article", "status": "Submitted for Review", "writerId": 7, "editorId": 5, "submissionDate": "2025-05-27T16:00:00.000Z", "dueDate": "2025-05-28T17:00:00.000Z" },
      { "id": 6, "projectId": 2, "title": "Data Breach Prevention Tactics for 2025", "type": "Article", "status": "Requires Revision", "writerId": 7, "editorId": 4, "submissionDate": "2025-05-15T11:00:00.000Z", "dueDate": "2025-05-14T17:00:00.000Z" }
    ]
  };

  const PIE_CHART_COLORS = [
    muiTheme.palette.primary.main,
    muiTheme.palette.secondary.main,
    muiTheme.palette.success.main,
    muiTheme.palette.warning.main,
    muiTheme.palette.info.main,
    '#FFBB28',
    '#FF8042',
    '#00C49F'
  ];

  const processedData = useMemo(() => {
    const activeClients = jsonData.clients.filter(client => client.isActive).length;
    const activeProjects = jsonData.projects.filter(project => project.status === "In Progress" || project.status === "Pending").length;
    const pendingContentPieces = jsonData.contentPieces.filter(cp => ["Draft", "In Review", "Submitted for Review", "Requires Revision"].includes(cp.status)).length;

    const completedProjectsCount = jsonData.projects.filter(p => p.status === "Completed" || p.status === "Published").length;
    const totalProjects = jsonData.projects.length;
    const projectCompletionRate = totalProjects > 0 ? (completedProjectsCount / totalProjects) * 100 : 0;

    const projectStatusCounts = jsonData.projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});
    const projectStatusData = Object.entries(projectStatusCounts).map(([name, value]) => ({ name, value }));

    const contentTypeCounts = jsonData.contentPieces.reduce((acc, piece) => {
      acc[piece.type] = (acc[piece.type] || 0) + 1;
      return acc;
    }, {});
    const contentTypeData = Object.entries(contentTypeCounts).map(([name, value]) => ({ name, value }));

    return {
      activeClients, activeProjects, pendingContentPieces, projectCompletionRate, projectStatusData, contentTypeData, totalProjects, completedProjectsCount
    };
  }, []);

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