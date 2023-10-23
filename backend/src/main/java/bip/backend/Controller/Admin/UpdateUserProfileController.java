package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/update")
public class UpdateUserProfileController {

    private final UserProfileRepository userProfileRepository;

    public UpdateUserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @PutMapping("/{jobTitle}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String jobTitle, @RequestBody String newJobTitle) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(newJobTitle);

            if (!jsonNode.has("jobTitle")) {
                return ResponseEntity.badRequest().body("Missing 'jobTitle' in the request body.");
            }

            String updatedJobTitle = jsonNode.get("jobTitle").asText();
            boolean updated = UserProfile.updateUserProfile(jobTitle, updatedJobTitle, userProfileRepository);

            if (updated) {
                return ResponseEntity.ok("User Profile updated!");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }

        return ResponseEntity.badRequest().body("User Profile not updated.");
    }

}