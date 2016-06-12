package com.hpe.it.sharedservice.devops.platform.utils.mongo;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;

@Repository("mongoOperations")
public class MongoOperations {
	
	@Autowired
	private MongoDBTemplate dbTemp;  
	  
    public int insert(String collection, final BasicDBObject dbObj) {  
        return (Integer) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.insert(dbObj).getN();  
            }  
        }, collection);  
    }  
  
    public int update(String collection, final BasicDBObject oldObj,  
            final BasicDBObject newObj) {  
        return (Integer) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.update(oldObj, newObj,true,false).getN();  
            }  
        }, collection);  
    }  
  
    public int delete(String collection, final BasicDBObject dbObj) {  
        return (Integer) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.remove(dbObj).getN();  
            }  
        }, collection);  
    }  
  
    public Object selectOne(String collection, final BasicDBObject dbObj) {  
        return dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.findOne(dbObj);  
            }  
        }, collection);  
    }  
    
    public DBObject selectSortedOne(String collection, final BasicDBObject dbSortObj) {  
        return (DBObject) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.find().sort(dbSortObj).limit(1).next(); 
            }  
        }, collection);
    }  
    
    @SuppressWarnings("unchecked")
	public  List<DBObject> selectSortedCollection(String collection,final BasicDBObject conditionObj, final BasicDBObject dbSortObj,final BasicDBObject keyObj,final int skipNum, final int limitNum) {  
        return (List<DBObject>) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
            	System.out.println(dbCollection.find(conditionObj,keyObj).sort(dbSortObj).skip(skipNum).limit(limitNum).toArray());
                return dbCollection.find(conditionObj,keyObj).sort(dbSortObj).skip(skipNum).limit(limitNum).toArray(); 
            }  
        }, collection);  
    }
    
    public List<String> getDistinct(String collection,final String mappedKey){
    	return (List<String>) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.distinct(mappedKey);
                }  
        }, collection); 
    }
    

    
	public  long getCountByCondition(String collection,final BasicDBObject conditionObj) {  
        return (Long) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.getCount(conditionObj); 
            }  
        }, collection);  
    }  
	
/*	public boolean executeScript(String scriptContent){
		try{
			dbTemp.getConn().eval(scriptContent);
			return true;
		}catch(Exception ex){
			return false;
		}
		
	}*/
	
	
	@SuppressWarnings("unchecked")
	public Iterable<DBObject>  getAggregation(String collection,final DBObject match,final DBObject group, final DBObject sort, final DBObject project){
    	return (Iterable<DBObject>) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
            	List<DBObject> pipeline=new ArrayList<DBObject>();
            	if(match!=null)pipeline.add(match);
            	if(group!=null)pipeline.add(group);
            	if(sort!=null)pipeline.add(sort);
            	if(project!=null)pipeline.add(project);
            	
                return dbCollection.aggregate(pipeline).results();
                }  
        }, collection); 
    }
    @SuppressWarnings("unchecked")  
    public Map<String, DBObject> selectMap(String collection,  
            final BasicDBObject dbObj) {  
        return ((DBObject) selectOne(collection, dbObj)).toMap();  
    }  
  
    @SuppressWarnings("unchecked")  
    public List<DBObject> selectList(String collection,  
            final BasicDBObject dbObj) {  
        return (List<DBObject>) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.find(dbObj).toArray();  
            }  
        }, collection);  
    }
    
    @SuppressWarnings("unchecked")  
    public List<DBObject> selectList(String collection,  
            final BasicDBObject dbObj,final BasicDBObject keyDbObj, final BasicDBObject sortObj) {
    		return (List<DBObject>) dbTemp.execute(new MongoMsgCallback() {  
            public Object doExecute(DBCollection dbCollection) {  
                return dbCollection.find(dbObj,keyDbObj).sort(sortObj).toArray();  
            }  
        }, collection);  
    }
    
    
	public MongoDBTemplate getDbTemp() {
		return dbTemp;
	}

	public void setDbTemp(MongoDBTemplate dbTemp) {
		this.dbTemp = dbTemp;
	}

}

abstract class MongoMsgCallback {
	abstract Object doExecute(DBCollection dbCollection);
}
   