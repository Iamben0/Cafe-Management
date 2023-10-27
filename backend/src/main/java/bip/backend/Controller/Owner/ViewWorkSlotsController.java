package bip.backend.Controller.Owner;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/owner/view/work-slots")
public class ViewWorkSlotsController {
    @GetMapping("/")
    public ResponseEntity<String> viewWorkSlot() {
        try {
            return ResponseEntity.ok(new WorkSlot().viewWorkSlot());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}