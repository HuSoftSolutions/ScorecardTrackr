package com.scoretrackr.data.hole;

import com.scoretrackr.data.nine.NineMapper;
import com.scoretrackr.models.Hole;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class HoleMapper implements RowMapper<Hole> {

    @Override
    public Hole mapRow(ResultSet rs, int rowNum) throws SQLException {
        Hole hole = new Hole();

        hole.setHoleId(rs.getString("hole_id"));
        hole.setNumber(rs.getInt("number"));
        hole.setHandicap(rs.getInt("handicap"));
        hole.setPar(rs.getInt("par"));
        hole.setYards(rs.getInt("yards"));
        NineMapper nineMapper = new NineMapper();
        hole.setNine(nineMapper.mapRow(rs, rowNum));

        return hole;
    }

}
