import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faHeadset, faUserTie, faTasks, faChartLine, faHandsHelping, faBookReader, faDraftingCompass } from '@fortawesome/free-solid-svg-icons';

const categories = [
  { icon: faMailBulk, title: "Marketing", vacancies: 123, delay: "0.1s" },
  { icon: faHeadset, title: "Customer Service", vacancies: 123, delay: "0.3s" },
  { icon: faUserTie, title: "Human Resource", vacancies: 123, delay: "0.5s" },
  { icon: faTasks, title: "Project Management", vacancies: 123, delay: "0.7s" },
  { icon: faChartLine, title: "Business Development", vacancies: 123, delay: "0.1s" },
  { icon: faHandsHelping, title: "Sales & Communication", vacancies: 123, delay: "0.3s" },
  { icon: faBookReader, title: "Teaching & Education", vacancies: 123, delay: "0.5s" },
  { icon: faDraftingCompass, title: "Design & Creative", vacancies: 123, delay: "0.7s" },
];

const ExploreByCategory = () => {
  return (
    <Container>
      <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
        Explore By Category
      </h1>
      <Row className="g-4">
        {categories.map((category, index) => (
          <Col key={index} lg={3} sm={6} className={`wow fadeInUp`} data-wow-delay={category.delay}>
            <Card className="cat-item rounded p-4">
              <Card.Body className="text-center">
                <FontAwesomeIcon icon={category.icon} size="3x" className="text-primary mb-4" />
                <Card.Title className="mb-3">{category.title}</Card.Title>
                <Card.Text className="mb-0">{category.vacancies} Vacancy</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExploreByCategory;
