import json

def transform_geojson(input_file, output_file):
    # Load the input GeoJSON file
    with open(input_file, 'r') as f:
        input_data = json.load(f)
    
    # Create the output structure
    output_data = {
        "type": "FeatureCollection",
        "name": "co_cimh",
        "features": []
    }
    
    # Transform each feature
    for feature in input_data['features']:
        # Create a new feature with the structure of the first file
        new_feature = {
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": feature['geometry']['coordinates']
            },
            "properties": {
                "situacao": "Disseminação",
                "identificador": feature['properties']['mi'],
                "id": len(output_data['features']) + 1
            }
        }
        
        output_data['features'].append(new_feature)
    
    # Write the transformed data to the output file
    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=4)
    
    print(f"Transformation complete. Output saved to {output_file}")

# Example usage
transform_geojson(r'C:\Users\marcel.1CGEO\Desktop\bloco_1p.geojson', r'C:\Users\marcel.1CGEO\Desktop\bloco_1p_2025.geojson')