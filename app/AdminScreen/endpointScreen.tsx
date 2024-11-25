import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchEndpoint } from "../../services/adminService";

interface EndpointCategory {
  [key: string]: {
    [endpointPath: string]: {
      [method: string]: {
        Description: string;
        [key: string]: any;
      };
    };
  };
}

interface APIResponse {
  base_url: string;
  endpoints: EndpointCategory;
}

const EndpointScreen: React.FC = () => {
  const [apiData, setApiData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const loadEndpoints = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchEndpoint();
      setApiData(response.data.api);
    } catch (error) {
      console.error("Error fetching endpoints:", error);
      Alert.alert("Error", "Failed to load API endpoints.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEndpoints();
  }, [loadEndpoints]);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
  };

  const renderEndpointDetails = ({ item }: { item: [string, any] }) => {
    const [endpointPath, methods] = item;
  
    return (
      <View style={styles.endpointContainer}>
        <Text style={styles.endpointPath}>
          {apiData?.base_url + endpointPath}
        </Text>
        {Object.entries(methods).map(([method, details]) => {
          const typedDetails = details as {
            Description: string;
            [key: string]: any;
          };
  
          return (
            <View key={method} style={styles.methodContainer}>
              <Text style={styles.method}>{method}</Text>
              <Text style={styles.description}>
                {typedDetails.Description || "No description available"}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderCategory = ({ item }: { item: [string, any] }) => {
    const [category, endpointData] = item;

    return (
      <View>
        <TouchableOpacity
          onPress={() => toggleCategory(category)}
          style={styles.categoryHeader}
        >
          <Text style={styles.categoryTitle}>{category}</Text>
        </TouchableOpacity>
        {expandedCategory === category && (
          <FlatList
            data={Object.entries(endpointData)}
            keyExtractor={(endpointKey) => endpointKey[0]}
            renderItem={renderEndpointDetails}
          />
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4682B4" />
        <Text style={styles.loadingText}>Loading Endpoints...</Text>
      </View>
    );
  }

  if (!apiData || !Object.keys(apiData.endpoints).length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Endpoints Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.entries(apiData.endpoints)}
      keyExtractor={(category) => category[0]}
      renderItem={renderCategory}
      contentContainerStyle={styles.container}
    />
  );
};

export default EndpointScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
  categoryHeader: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginVertical: 5,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  endpointContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  endpointPath: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  methodContainer: {
    marginTop: 5,
    paddingVertical: 5,
  },
  method: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginTop: 3,
  },
});
