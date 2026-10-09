package Project.Civic.Pulse.repository;

import Project.Civic.Pulse.entity.Feedback;
import Project.Civic.Pulse.entity.Grievance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByGrievance(Grievance grievance);
}
