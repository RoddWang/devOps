package com.hpe.it.sharedservice.devops.platform.utils.mongo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.WriteConcern;


public class MongoDBTemplate {

	private String mongoServer = "g9t3362.houston.hp.com";
	private int serverPort = 20001;
	private String dbName = "wstaxdev";
	private String userName;
	private String password;
	//private int count=0;

	public final Object execute(MongoMsgCallback action, String collection) {
		MongoClient db = getConn();
		Object result =null;
		try{
			DBCollection dbColl = db.getDB(dbName).getCollection(collection);
			dbColl.setWriteConcern(WriteConcern.SAFE);
			result = action.doExecute(dbColl);

		}catch(Exception e){
			e.printStackTrace();
		}finally{
			closeDb(db);
		}
		return result;
		


	}

	
	
	protected MongoClient getConn() {
		return getConn(mongoServer, serverPort, userName, password);
	}

	private MongoClient getConn(String server, int port, String userName,
			String password) {

		//count++;

			MongoCredential credential = null;
			if (!StringUtils.isEmpty(userName))
				credential = MongoCredential.createMongoCRCredential(userName,
						"admin", password.toCharArray());
			
			//MongoClientOptions options= MongoClientOptions.builder().connectionsPerHost(10).build();
			List<ServerAddress> seeds =new ArrayList<ServerAddress>();
			String[] splitedServers=server.split(";");
			try {
				for(String splitedServer:splitedServers){
					seeds.add(new ServerAddress(splitedServer, port));
				}

				MongoClient m = new MongoClient(seeds,
						Arrays.asList(credential));
				return m;
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return null;
	}

	private void closeDb(MongoClient db) {
		if (db != null) {
			db.close();
			db = null;
		}
	}

	public String getMongoServer() {
		return mongoServer;
	}

	public void setMongoServer(String mongoServer) {
		this.mongoServer = mongoServer;
	}

	public int getServerPort() {
		return serverPort;
	}

	public void setServerPort(int serverPort) {
		this.serverPort = serverPort;
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
