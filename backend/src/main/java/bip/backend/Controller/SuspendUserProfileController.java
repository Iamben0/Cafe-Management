package bip.backend.Controller;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/suspend")
public class SuspendUserProfileController {
    private final UserProfileRepository userProfileRepository;
    public SuspendUserProfileController(UserProfileRepository userProfileRepository)
    {
        this.userProfileRepository = userProfileRepository;
    }

    @DeleteMapping("/{jobTitle}")
    public ResponseEntity<String> suspendUserProfile(@PathVariable String jobTitle)
    {
        try {
            UserProfile.suspendUserProfile(jobTitle, userProfileRepository);
            return ResponseEntity.ok("Success");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}