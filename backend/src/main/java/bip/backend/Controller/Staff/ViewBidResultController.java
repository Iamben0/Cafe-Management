package bip.backend.Controller.Staff;

import bip.backend.Entity.Bid;
import bip.backend.Entity.WorkSlot;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/view/bid-result")
public class ViewBidResultController {
    @GetMapping("/{staffId}")
    public ResponseEntity<String> viewBidResult(@PathVariable String staffId) {
        try {
            return ResponseEntity.ok(new Bid().viewBidResult(staffId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
