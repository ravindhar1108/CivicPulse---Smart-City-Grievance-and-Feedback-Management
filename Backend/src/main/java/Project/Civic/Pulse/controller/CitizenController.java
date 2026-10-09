package Project.Civic.Pulse.controller;

import Project.Civic.Pulse.dto.GrievanceRequestDTO;
import Project.Civic.Pulse.dto.GrievanceResponseDTO;
import Project.Civic.Pulse.service.GrievanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citizen")
public class CitizenController {

    private final GrievanceService grievanceService;

    public CitizenController(GrievanceService grievanceService) {
        this.grievanceService = grievanceService;
    }

    @PostMapping("/grievances")
    public ResponseEntity<GrievanceResponseDTO> submitGrievance(
            @RequestBody GrievanceRequestDTO request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(grievanceService.submitGrievance(request, email));
    }

    @GetMapping("/grievances")
    public ResponseEntity<List<GrievanceResponseDTO>> getMyGrievances(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(grievanceService.getGrievancesForCitizen(email));
    }
}
