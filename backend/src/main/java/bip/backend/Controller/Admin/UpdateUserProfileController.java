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
    private final ObjectMapper objectMapper = new ObjectMapper();

    public UpdateUserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @PutMapping("/{jobTitle}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String jobTitle, @RequestBody String newJobTitle) {
        try {
            JsonNode jsonNode = objectMapper.readTree(newJobTitle);
            UserProfile.updateUserProfile(jobTitle, jsonNode.get("jobTitle").asText(), userProfileRepository);
            return ResponseEntity.ok("Profile Updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}