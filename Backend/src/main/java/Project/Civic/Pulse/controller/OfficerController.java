package Project.Civic.Pulse.controller;

import Project.Civic.Pulse.dto.GrievanceResponseDTO;
import Project.Civic.Pulse.entity.GrievanceStatus;
import Project.Civic.Pulse.service.GrievanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/officer")
public class OfficerController {

    private final GrievanceService grievanceService;

    public OfficerController(GrievanceService grievanceService) {
        this.grievanceService = grievanceService;
    }

    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceResponseDTO>> getAssignedGrievances(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(grievanceService.getGrievancesForOfficer(email));
    }

    @PutMapping("/grievances/{id}/status")
    public ResponseEntity<GrievanceResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam GrievanceStatus status,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(grievanceService.updateStatus(id, status, email));
    }
}
