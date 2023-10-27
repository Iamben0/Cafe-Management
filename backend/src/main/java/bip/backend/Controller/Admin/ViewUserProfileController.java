package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserProfileRepository;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/view")
public class ViewUserProfileController {
    @GetMapping("/user-profiles/")
    public ResponseEntity<String> viewUserProfile() {
        try {
            UserProfile userProfile = new UserProfile();
            return ResponseEntity.ok(userProfile.viewUserProfile());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}