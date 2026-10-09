package Project.Civic.Pulse.service;

import Project.Civic.Pulse.dto.GrievanceRequestDTO;
import Project.Civic.Pulse.dto.GrievanceResponseDTO;
import Project.Civic.Pulse.entity.Grievance;
import Project.Civic.Pulse.entity.GrievanceStatus;
import Project.Civic.Pulse.entity.Role;
import Project.Civic.Pulse.entity.User;
import Project.Civic.Pulse.repository.GrievanceRepository;
import Project.Civic.Pulse.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GrievanceService {

    private final GrievanceRepository grievanceRepository;
    private final UserRepository userRepository;

    public GrievanceService(GrievanceRepository grievanceRepository, UserRepository userRepository) {
        this.grievanceRepository = grievanceRepository;
        this.userRepository = userRepository;
    }

    public GrievanceResponseDTO submitGrievance(GrievanceRequestDTO dto, String citizenEmail) {
        User citizen = userRepository.findByEmail(citizenEmail)
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        Grievance grievance = new Grievance();
        grievance.setTitle(dto.getTitle());
        grievance.setDescription(dto.getDescription());
        grievance.setCategory(dto.getCategory());
        grievance.setImageUrl(dto.getImageUrl());
        grievance.setLocation(dto.getLocation());
        grievance.setCitizen(citizen);
        // Status is automatically set to PENDING in @PrePersist

        Grievance saved = grievanceRepository.save(grievance);
        return mapToDTO(saved);
    }

    public List<GrievanceResponseDTO> getGrievancesForCitizen(String citizenEmail) {
        User citizen = userRepository.findByEmail(citizenEmail)
                .orElseThrow(() -> new RuntimeException("Citizen not found"));
        return grievanceRepository.findByCitizen(citizen).stream()
                .map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<GrievanceResponseDTO> getAllGrievances() {
        return grievanceRepository.findAll().stream()
                .map(this::mapToDTO).collect(Collectors.toList());
    }

    public GrievanceResponseDTO assignOfficer(Long grievanceId, Long officerId) {
        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));
        User officer = userRepository.findById(officerId)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        if (officer.getRole() != Role.OFFICER) {
            throw new RuntimeException("User is not an officer");
        }

        if (grievance.getAssignedOfficer() != null) {
            throw new RuntimeException("Grievance already assigned");
        }

        grievance.setAssignedOfficer(officer);
        grievance.setStatus(GrievanceStatus.IN_PROGRESS);
        return mapToDTO(grievanceRepository.save(grievance));
    }

    public List<GrievanceResponseDTO> getGrievancesForOfficer(String officerEmail) {
        User officer = userRepository.findByEmail(officerEmail)
                .orElseThrow(() -> new RuntimeException("Officer not found"));
        return grievanceRepository.findByAssignedOfficer(officer).stream()
                .map(this::mapToDTO).collect(Collectors.toList());
    }

    public GrievanceResponseDTO updateStatus(Long grievanceId, GrievanceStatus newStatus, String officerEmail) {
        Grievance grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));
        User officer = userRepository.findByEmail(officerEmail)
                .orElseThrow(() -> new RuntimeException("Officer not found"));

        if (grievance.getAssignedOfficer() == null || !grievance.getAssignedOfficer().getId().equals(officer.getId())) {
            throw new RuntimeException("You can only update grievances assigned to you");
        }

        grievance.setStatus(newStatus);
        return mapToDTO(grievanceRepository.save(grievance));
    }

    private GrievanceResponseDTO mapToDTO(Grievance g) {
        GrievanceResponseDTO dto = new GrievanceResponseDTO();
        dto.setId(g.getId());
        dto.setTitle(g.getTitle());
        dto.setDescription(g.getDescription());
        dto.setCategory(g.getCategory());
        dto.setStatus(g.getStatus());
        dto.setImageUrl(g.getImageUrl());
        dto.setLocation(g.getLocation());
        dto.setCreatedAt(g.getCreatedAt());
        dto.setUpdatedAt(g.getUpdatedAt());
        if (g.getCitizen() != null) {
            dto.setCitizenName(g.getCitizen().getName());
        }
        if (g.getAssignedOfficer() != null) {
            dto.setAssignedOfficerName(g.getAssignedOfficer().getName());
        }
        return dto;
    }
}
