package Project.Civic.Pulse.repository;

import Project.Civic.Pulse.entity.Grievance;
import Project.Civic.Pulse.entity.User;
import Project.Civic.Pulse.entity.GrievanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievance, Long> {
    List<Grievance> findByCitizen(User citizen);
    List<Grievance> findByAssignedOfficer(User assignedOfficer);
    List<Grievance> findByStatus(GrievanceStatus status);
}
