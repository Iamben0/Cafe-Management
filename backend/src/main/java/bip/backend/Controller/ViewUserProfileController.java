package bip.backend.Controller;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/view")
public class ViewUserProfileController {

    private final UserProfileRepository userProfileRepository;

    public ViewUserProfileController(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    @GetMapping("/")
    public ResponseEntity<String> viewUserProfile() {
        try {
            return ResponseEntity.ok(UserProfile.viewUserProfile(userProfileRepository));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}