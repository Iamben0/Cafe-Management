package bip.backend.Controller.Staff;

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
@RequestMapping("/staff/view/available-work-slots")
public class ViewWorkSlotToBidController {
    @GetMapping("/")
    public ResponseEntity<String> viewWorkSlotToBid() {
        try {
            return ResponseEntity.ok(new WorkSlot().viewWorkSlotToBid());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}