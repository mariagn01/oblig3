package webprog.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett (Billett innBillett) {
        String sql = "INSERT INTO Billett (fornavn, etternavn, telefonnr, epost, film, antall) VALUES(?,?,?,?,?,?)";
        db.update(sql, innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost(), innBillett.getFilm(), innBillett.getAntall());
        System.out.println("Lagret");
    }

    public List<Billett> hentBilletter() {
        String sql = "SELECT * FROM Billett";
        List<Billett> AlleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        return AlleBilletter;
    }

    public void slettBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
