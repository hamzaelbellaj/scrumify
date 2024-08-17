import React from 'react';
import { Container, Grid, Paper, Typography, Divider, Avatar, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // Importer l'icône LinkedIn
import EmailIcon from '@mui/icons-material/Email'; // Importer l'icône Email

// Importation des images
import managerImage from './asset/manager.png';
import employerImage from './asset/employer.png';
import developerImage from './asset/pic.png'; // Importation de votre image

function AboutUs() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '30px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          À Propos de Scrumify
        </Typography>
        
        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          L'Importance de Scrum
        </Typography>
        <Typography variant="body1" paragraph>
          Scrum est une méthodologie agile conçue pour faciliter la collaboration, améliorer la communication, et accélérer le développement de produits. 
          C'est un cadre de travail qui permet aux équipes de réagir efficacement aux changements et de livrer des solutions de haute qualité à un rythme soutenu. 
          Scrumify intègre ces principes fondamentaux pour transformer la façon dont les équipes interagissent et progressent dans leurs projets.
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Introduction à Scrumify
        </Typography>
        <Typography variant="body1" paragraph>
          Scrumify est une plateforme conçue pour optimiser la gestion des projets Scrum. En alliant technologie moderne et meilleures pratiques de l'industrie, 
          Scrumify offre une solution complète pour la gestion de sprints et de tâches, rendant les processus plus clairs et mesurables pour tous les participants.
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Fonctionnalités Clés de Scrumify
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <img src={managerImage} alt="Interface Manager" style={{ marginBottom: '10px', width: '300px', height: '150px' }} />
              <Typography variant="h6" gutterBottom>
                Interface Manager
              </Typography>
              <Typography variant="body2">
                Gestion de Sprints (CRUD), Gestion des Employés (CRUD), et Assignation et Suivi des Tâches.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <img src={employerImage} alt="Interface Employé" style={{ marginBottom: '10px', width: '300px', height: '150px' }} />
              <Typography variant="h6" gutterBottom>
                Interface Employé
              </Typography>
              <Typography variant="body2">
                Gestion Personnelle des Tâches, Tableau de Bord Employé.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Ethique et Style
        </Typography>
        <Typography variant="body1" paragraph>
          Nous croyons en la création d'un produit qui n'est pas seulement fonctionnel mais aussi éthiquement conçu. Scrumify est développé avec ReactJS, 
          utilisant les dernières normes du web pour garantir une expérience utilisateur fluide, accessible et réactive. Les designs sont pensés pour être inclusifs, 
          intuitifs et attrayants, avec des animations et des visuels qui facilitent la navigation et enrichissent l'expérience utilisateur.
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Engagement envers l'Excellence
        </Typography>
        <Typography variant="body1" paragraph>
          Chez Scrumify, nous nous engageons à fournir une plateforme qui non seulement répond, mais anticipe les besoins des équipes agiles. 
          Nous innovons constamment pour assurer que chaque fonctionnalité de Scrumify soutient parfaitement les dynamiques de travail collaboratif et agile.
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          À Propos du Développeur
        </Typography>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Avatar 
            src={developerImage} 
            alt="Hamza El Bellaj" 
            style={{ width: '150px', height: '150px', margin: '0 auto' }} 
          />
        </div>

        <Typography variant="h6" align="center" gutterBottom>
          Hamza El Bellaj
        </Typography>

        <Typography variant="body2" paragraph>
          <strong>Développeur :</strong> Étudiant en 4ème année MIAGE IIR, spécialisé en informatique et réseau, à l'école <span style={{ color: '#1976d2' }}>EMSI Marrakech</span>.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Projet :</strong> <span style={{ fontStyle: 'italic' }}>Scrumify</span> est un Projet de Fin d'Année (PFA) conçu pour améliorer la gestion de projets Scrum. Développé entièrement par moi-même sous la supervision de <span style={{ fontWeight: 'bold' }}>Sara Hasdi</span>.
        </Typography>
        <Typography variant="body2" paragraph>
          <strong>Objectif :</strong> Offrir une solution moderne et efficace pour la gestion des projets Scrum, en mettant l'accent sur la clarté, l'efficacité, et la collaboration au sein des équipes.
        </Typography>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5" gutterBottom>
          Contactez-Nous
        </Typography>
        <Typography variant="body1" paragraph>
          Pour plus d'informations, ou pour débuter avec Scrumify, contactez notre équipe via notre page de contact. Nous sommes ici pour vous aider à transformer votre gestion de projet agile.
        </Typography>

        {/* Ajout des icônes LinkedIn et Gmail */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/hamza-elbellaj-ab9033197/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#0072b1', fontSize: '40px' }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:hamzaelbellaj@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#D44638', marginLeft: '10px', fontSize: '40px' }}
          >
            <EmailIcon fontSize="large" />
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
}

export default AboutUs;
