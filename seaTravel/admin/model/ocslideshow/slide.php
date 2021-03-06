<?php
class ModelOcslideshowSlide extends Model {
	public function addocslideshow($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "ocslideshow SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "',auto = '" . (int)$data['auto'] . "',delay = '" . (int)$data['delay'] . "',hover = '" . (int)$data['hover'] . "',nextback = '" . (int)$data['nextback'] . "',contrl = '" . (int)$data['contrl'] . "',effect = '" . $data['effect'] . "'");
	
		$ocslideshow_id = $this->db->getLastId();
	
		if (isset($data['ocslideshow_image'])) {
			foreach ($data['ocslideshow_image'] as $ocslideshow_image) {
			
				$banner_store = ""; 
				if(isset($ocslideshow_image['banner_store'])) {
					$banner_store = implode(',', $ocslideshow_image['banner_store']); 
				}
				
				$this->db->query("INSERT INTO " . DB_PREFIX . "ocslideshow_image SET ocslideshow_id = '" . (int)$ocslideshow_id . "', link = '" .  $this->db->escape($ocslideshow_image['link']) . "', type = '" .  $this->db->escape($ocslideshow_image['type']) . "', image = '" .  $this->db->escape($ocslideshow_image['image']) . "',banner_store = '" .$banner_store. "'");
				
				$ocslideshow_image_id = $this->db->getLastId();
				
				foreach ($ocslideshow_image['ocslideshow_image_description'] as $language_id => $ocslideshow_image_description) {				
					$this->db->query("INSERT INTO " . DB_PREFIX . "ocslideshow_image_description SET ocslideshow_image_id = '" . (int)$ocslideshow_image_id . "', language_id = '" . (int)$language_id . "', ocslideshow_id = '" . (int)$ocslideshow_id . "', title = '" .  $this->db->escape($ocslideshow_image_description['title']) . "',sub_title = '" .  $this->db->escape($ocslideshow_image_description['sub_title']) . "',description = '" .  $this->db->escape($ocslideshow_image_description['description']) . "'");
				}
			}
		}		
	}
	
	public function editocslideshow($ocslideshow_id, $data) {
		$this->db->query("UPDATE " . DB_PREFIX . "ocslideshow SET name = '" . $this->db->escape($data['name']) . "', status = '" . (int)$data['status'] . "',auto = '" . (int)$data['auto'] . "',delay = '" . (int)$data['delay'] . "',hover = '" . (int)$data['hover'] . "',nextback = '" . (int)$data['nextback'] . "',effect = '" . $data['effect'] . "',contrl = '" . (int)$data['contrl'] . "' WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");

		$this->db->query("DELETE FROM " . DB_PREFIX . "ocslideshow_image WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "ocslideshow_image_description WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
			
		if (isset($data['ocslideshow_image'])) {
			foreach ($data['ocslideshow_image'] as $ocslideshow_image) {
				$banner_store = ""; 
				if(isset($ocslideshow_image['banner_store'])) {
					$banner_store = implode(',', $ocslideshow_image['banner_store']); 
				}
				$this->db->query("INSERT INTO " . DB_PREFIX . "ocslideshow_image SET ocslideshow_id = '" . (int)$ocslideshow_id . "', link = '" .  $this->db->escape($ocslideshow_image['link']) . "', type = '" .  $this->db->escape($ocslideshow_image['type']) . "', image = '" .  $this->db->escape($ocslideshow_image['image']) . "', banner_store = '" .  $banner_store . "'");
				
				$ocslideshow_image_id = $this->db->getLastId();
				
				foreach ($ocslideshow_image['ocslideshow_image_description'] as $language_id => $ocslideshow_image_description) {				
					$this->db->query("INSERT INTO " . DB_PREFIX . "ocslideshow_image_description SET ocslideshow_image_id = '" . (int)$ocslideshow_image_id . "', language_id = '" . (int)$language_id . "', ocslideshow_id = '" . (int)$ocslideshow_id . "', title = '" .  $this->db->escape($ocslideshow_image_description['title']) . "',sub_title = '" .  $this->db->escape($ocslideshow_image_description['sub_title']) . "',description = '" .  $this->db->escape($ocslideshow_image_description['description']) . "'");
				}
			}
		}			
	}
	
	public function deleteocslideshow($ocslideshow_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "ocslideshow WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "ocslideshow_image WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "ocslideshow_image_description WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
	}
	
	public function getocslideshow($ocslideshow_id) {
		$query = $this->db->query("SELECT DISTINCT * FROM " . DB_PREFIX . "ocslideshow WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
		
		return $query->row;
	}
		
	public function getocslideshows($data = array()) {
		$sql = "SELECT * FROM " . DB_PREFIX . "ocslideshow";
		
		$sort_data = array(
			'name',
			'status'
		);	
		
		if (isset($data['sort']) && in_array($data['sort'], $sort_data)) {
			$sql .= " ORDER BY " . $data['sort'];	
		} else {
			$sql .= " ORDER BY name";	
		}
		
		if (isset($data['order']) && ($data['order'] == 'DESC')) {
			$sql .= " DESC";
		} else {
			$sql .= " ASC";
		}
		
		if (isset($data['start']) || isset($data['limit'])) {
			if ($data['start'] < 0) {
				$data['start'] = 0;
			}					

			if ($data['limit'] < 1) {
				$data['limit'] = 20;
			}	
		
			$sql .= " LIMIT " . (int)$data['start'] . "," . (int)$data['limit'];
		}		
		
		$query = $this->db->query($sql);

		return $query->rows;
	}
		
	public function getocslideshowImages($ocslideshow_id) {
		$ocslideshow_image_data = array();
		
		$ocslideshow_image_query = $this->db->query("SELECT * FROM " . DB_PREFIX . "ocslideshow_image WHERE ocslideshow_id = '" . (int)$ocslideshow_id . "'");
		
		foreach ($ocslideshow_image_query->rows as $ocslideshow_image) {
			$ocslideshow_image_description_data = array();
			 
			$ocslideshow_image_description_query = $this->db->query("SELECT * FROM " . DB_PREFIX . "ocslideshow_image_description WHERE ocslideshow_image_id = '" . (int)$ocslideshow_image['ocslideshow_image_id'] . "' AND ocslideshow_id = '" . (int)$ocslideshow_id . "'");
			
			foreach ($ocslideshow_image_description_query->rows as $ocslideshow_image_description) {			
				$ocslideshow_image_description_data[$ocslideshow_image_description['language_id']] = array('title' => $ocslideshow_image_description['title'],
				'sub_title' => $ocslideshow_image_description['sub_title'],
				'description' => $ocslideshow_image_description['description'],
				
				);
			}
		
			$ocslideshow_image_data[] = array(
				'ocslideshow_image_description' => $ocslideshow_image_description_data,
				'link'                     => $ocslideshow_image['link'],
				'type'                     => $ocslideshow_image['type'],
				'image'                    => $ocslideshow_image['image'],	
		
				'banner_store'                    => $ocslideshow_image['banner_store']					
			);
		}
		
		return $ocslideshow_image_data;
	}
		
	public function getTotalocslideshows() { 
      	$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "ocslideshow");
		
		return $query->row['total'];
	}


	
	public function deleteTable() {
			$sql = array(); 
			$sql[] = "DROP TABLE `".DB_PREFIX."ocslideshow";
			$sql[] = "DROP TABLE `".DB_PREFIX."ocslideshow_image";
			$sql[] = "DROP TABLE `".DB_PREFIX."ocslideshow_image_description";
			foreach( $sql as $q ){
				$query = $this->db->query( $q );
			}
			return true;
	}
}
?>