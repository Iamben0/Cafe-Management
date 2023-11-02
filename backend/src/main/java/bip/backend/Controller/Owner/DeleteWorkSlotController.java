package bip.backend.Controller.Owner;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/owner/delete")
public class DeleteWorkSlotController {
    @DeleteMapping("/{id}/")
    public ResponseEntity<String> deleteWorkSlot(@PathVariable int id) {
        try {
            new WorkSlot().deleteWorkSlot(id);
            return ResponseEntity.ok("Work Slot Deleted!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}