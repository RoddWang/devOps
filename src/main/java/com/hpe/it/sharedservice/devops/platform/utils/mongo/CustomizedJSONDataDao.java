/**
 * 
 */
package com.hpe.it.sharedservice.devops.platform.utils.mongo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.util.JSON;

/**
 * @author gezhu
 *
 */
public abstract class CustomizedJSONDataDao<T> {
	
	public abstract Class<T> getTClass();
	
	public abstract String getCollectionName();
	
	@Autowired
	private MongoOperations mongoOperations;
	
	public void saveNewObject(String collName,T obj)throws Exception{
		try{
		BasicDBObject dbObject=convertClassObject2DBObject(obj);
		mongoOperations.insert(collName, dbObject);
		}catch(Exception e){
			throw e;
		}
	}
	
	public void saveNewObject(T obj) throws Exception{
		if(getCollectionName()!=null){
			saveNewObject(getCollectionName(),obj);
		}
	}
	
	public T saveNewObjectAndGet(T obj) throws Exception{
		if(getCollectionName()!=null){
			saveNewObject(getCollectionName(),obj);
		}
		return obj;
	}
	
	public List<T> getItems(BasicDBObject conditionObj, BasicDBObject projectObj,BasicDBObject sortObj){
		if(getCollectionName()!=null){
			return getItems(getCollectionName(),conditionObj,projectObj,sortObj);
		}else
			return null;
	}
	
	public List<T> getItems(String collName,BasicDBObject conditionObj, BasicDBObject projectObj,BasicDBObject sortObj){
		List<T> list=new ArrayList<T>();
		for(DBObject dbObj:getDBObjects(collName,conditionObj,projectObj,sortObj)){
			list.add(convertDBObject2ClassObject(dbObj));
		}
		return list;
	}
	
	public List<DBObject> getDBObjects(String collName,BasicDBObject conditionObj, BasicDBObject projectObj,BasicDBObject sortObj){
		
		return mongoOperations.selectList(collName, conditionObj,projectObj, sortObj);
	}
	public long countByCondition(BasicDBObject conditionObj){
		return mongoOperations.getCountByCondition(getCollectionName(), conditionObj);
	}
	public List<DBObject> getDBObjects(BasicDBObject conditionObj, BasicDBObject projectObj,BasicDBObject sortObj){
		if(getCollectionName()!=null){
			return getDBObjects(getCollectionName(),conditionObj,projectObj,sortObj);
		}else
			return null;
	}

	
	public T getLimitedOne(BasicDBObject sortObj){
	try{
			DBObject limitedItem=mongoOperations.selectSortedOne(getCollectionName(), sortObj);
			return convertDBObject2ClassObject(limitedItem);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
			
	}
	
	public int removeDBObject(BasicDBObject conditionObj ){
		if(getCollectionName()!=null){
			return mongoOperations.delete(getCollectionName(), conditionObj);
		}else
			return 0;
	}
	
	public int updateSingleDBObject(BasicDBObject conditionObj, T updatedItem){
		if(getCollectionName()!=null){
			BasicDBObject newObj=convertClassObject2DBObject(updatedItem);
			return mongoOperations.update(getCollectionName(), conditionObj, newObj);
		}else
			return 0;
	}

	
	
	//Convert one Class to MongoDB JSON type 
	public  BasicDBObject convertClassObject2DBObject(T obj){
			String s=convertObject2JSON(obj);
			BasicDBObject dbObject=(BasicDBObject) JSON.parse(s);
			return dbObject;
		}
		
	public T convertDBObject2ClassObject(DBObject obj){
			String str= JSON.serialize(obj);
			return convertDBObject2ClassObject(str);
		}
	
	public String convertObject2JSON(T obj){
		Gson gson = new Gson();  
		String s=gson.toJson(obj);
		return s;
	}
	
	public T convertDBObject2ClassObject(String str){
		Gson gson = new Gson();
		T parsedObject = gson.fromJson(str,getTClass());
		return parsedObject;
	}
	
}
