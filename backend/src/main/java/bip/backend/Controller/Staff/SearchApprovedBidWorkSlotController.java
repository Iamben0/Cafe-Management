package bip.backend.Controller.Staff;

import bip.backend.Entity.Bid;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/view/approved-bid-work-slots/search/")
public class SearchApprovedBidWorkSlotController {
    // Search by name
    @GetMapping("/{staffId}/{shift}/")
    public ResponseEntity<String> submitSearchCriteria(@PathVariable int staffId, @PathVariable String shift)
    {
        try {
            return ResponseEntity.ok(new Bid().retrieveApprovedBidWorkSlot(staffId, shift));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}