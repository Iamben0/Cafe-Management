package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/search/user-profile")
public class SearchUserProfileController {
    // Search by job title
    @GetMapping("/{jobTitle}/")
    public ResponseEntity<String> submitSearchCriteria(@PathVariable String jobTitle)
    {
        try {
            return ResponseEntity.ok(new UserProfile().searchProfile(jobTitle));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}