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
        db.update(sql, innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost(),
                innBillett.getFilm(), innBillett.getAntall());
        System.out.println("Lagret");
    }

    public List<Billett> hentBilletter() {
        String sql = "SELECT * FROM Billett";
        List<Billett> AlleBilletter = db.query(sql, new BeanPropertyRowMapper<>(Billett.class));
        return AlleBilletter;
    }

    public Billett hentEnBillett(int id) {
        String sql = "SELECT * FROM Billett WHERE id=?";
        Billett enBillett = db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Billett.class),id);
        return enBillett;
    }

    public void endreEnBillett(Billett billett) {
        String sql = "UPDATE Billett SET fornavn=?, etternavn=?, telefonnr=?, epost=?, film=?, antall=? WHERE id=?";
        db.update(sql, billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost(), billett.getFilm(), billett.getAntall(), billett.getId());
    }

    public void slettEnBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id=?";
        db.update(sql,id);
    }

    public void slettBilletter(){
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
