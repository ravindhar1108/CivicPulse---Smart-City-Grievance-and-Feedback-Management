package Project.Civic.Pulse.controller;

import Project.Civic.Pulse.dto.GrievanceResponseDTO;
import Project.Civic.Pulse.service.GrievanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final GrievanceService grievanceService;

    public AdminController(GrievanceService grievanceService) {
        this.grievanceService = grievanceService;
    }

    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceResponseDTO>> getAllGrievances() {
        return ResponseEntity.ok(grievanceService.getAllGrievances());
    }

    @PutMapping("/grievances/{id}/assign")
    public ResponseEntity<GrievanceResponseDTO> assignOfficer(
            @PathVariable Long id,
            @RequestParam Long officerId) {
        return ResponseEntity.ok(grievanceService.assignOfficer(id, officerId));
    }
}
