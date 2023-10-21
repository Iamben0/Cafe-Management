package bip.backend.Repository;

import bip.backend.Entity.WorkSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkSlotRepository extends JpaRepository<WorkSlot, Integer> {
}