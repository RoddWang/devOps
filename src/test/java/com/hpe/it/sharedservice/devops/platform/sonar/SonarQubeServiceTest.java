package com.hpe.it.sharedservice.devops.platform.sonar;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.fail;

import com.hpe.it.sharedservice.devops.platform.service.SonarQubeService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class SonarQubeServiceTest {

	@Autowired
	private SonarQubeService sonarQubeService;
	
	@Test
	public void Test(){
		List<String> measures = new ArrayList<String>();
		measures.add("ncloc");
		String result = null;
		try {
			result = sonarQubeService.fetchSonarQubeMetricReport("devops1111", measures);
		} catch (IOException e) {
			fail(e.getMessage());
		}
		System.out.println("----------"+result);
		Assert.assertNotNull(result);
	}
}
