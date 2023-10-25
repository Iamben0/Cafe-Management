package bip.backend.Controller.Admin;

import bip.backend.Entity.UserProfile;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/suspend")
public class SuspendUserProfileController {

    @DeleteMapping("/{jobTitle}")
    public ResponseEntity<String> suspendUserProfile(@PathVariable String jobTitle) {
        try {
            new UserProfile().suspendUserProfile(jobTitle);
            return ResponseEntity.ok("Profile Suspended!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}