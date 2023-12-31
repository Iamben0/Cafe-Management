package bip.backend.Controller.Staff;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/view/available-work-slots")
public class ViewWorkSlotToBidController {
    @GetMapping("/{role}/")
    public ResponseEntity<String> viewWorkSlotToBid(@PathVariable String role) {
        try {
            return ResponseEntity.ok(new WorkSlot().viewWorkSlotToBid(role));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}