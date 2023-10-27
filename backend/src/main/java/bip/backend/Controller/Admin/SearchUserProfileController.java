package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
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
            return ResponseEntity.ok(new UserProfile().retrieveUserProfile(jobTitle));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}