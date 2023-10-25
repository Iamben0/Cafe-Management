package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import bip.backend.GetRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/update")
public class UpdateUserProfileController {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PutMapping("/{jobTitle}")
    public ResponseEntity<String> updateUserProfile(@PathVariable String jobTitle, @RequestBody String newJobTitle) {
        try {
            JsonNode jsonNode = objectMapper.readTree(newJobTitle);
            UserProfile userProfile = GetRepository.UserProfile().findByJobTitle(jobTitle);
            userProfile.updateUserProfile(jobTitle, jsonNode.get("jobTitle").asText());
            return ResponseEntity.ok("Profile Updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}